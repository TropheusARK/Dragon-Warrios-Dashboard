import { useEffect, useState } from "react";
import "./App.css";

function App(){

  const [playerData, setPlayerData] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [searchUID, setSearchUID] = useState();

  useEffect(() => {
    retrieveData()
  }, [])

  async function retrieveData(){

    try {

      const data = await fetch(`http://localhost:3000/api/player-stats/${searchUID}`);

      if (data.ok) {

        const stats = await data.json();
        setPlayerData(stats);

      } else {

        throw new Error(`HTTP ${data.status}: ${data.statusText}`);

      }

    } catch(error) {

       setErrorMsg(error.message);
    }
  }

  function updUID(id){
    
    if (id.trim() !== '' && !Number.isNaN(Number(id))) {
      setSearchUID(id);
    } else if (id === ""){
      setSearchUID("");
    }
  }

  if (errorMsg !== "") {
    return (
      <div>
        <h1> Dragon Warrior Stats Dashboard </h1>
        <h2> {errorMsg} </h2>
      </div>
    )
  }

  if (playerData === undefined){

    return (
      <div>
        <h1> Dragon Warrior Stats Dashboard </h1>
        <h2> Loading... </h2>
      </div>
    )
  }

  return(

    <div>

      {/* Background */}
      <div className="bg2ndLayer"></div>
      <img className = "bg" src="https://image.fonwall.ru/o/kc/fantsy-night-moon.jpeg?auto=compress&fit=crop&w=2048&h=1152&domain=img3.fonwall.ru" />

      {/* Top Bar */}
      <div className="header">
        <img className = "logo" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3656e992-a780-49e2-a400-f4f1d2952837/dm8nmgb-866dbd09-d9e3-40f0-94ef-075f4f91dafc.png/v1/fill/w_1280,h_1280,q_80,strp/roblox_new_icon_2026__by_mateusgchaves_dm8nmgb-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiIvZi8zNjU2ZTk5Mi1hNzgwLTQ5ZTItYTQwMC1mNGYxZDI5NTI4MzcvZG04bm1nYi04NjZkYmQwOS1kOWUzLTQwZjAtOTRlZi0wNzVmNGY5MWRhZmMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.vwZUkOz3zXxcr4bobGw9pMRC_kQiXRlcz4FErOlaVeI" />
        <h1>Dragon Warriors Stats DashBoard</h1>
        <input size="40" placeholder="Search By UserID" value={searchUID} onChange={(e) => updUID(e.target.value)} />
        <button className="searchIcon" onClick={retrieveData}/>
      </div>


      <div className="player">

        <h1> {"Alias : " + playerData.Name} </h1>
        <h2> {"UID : " + playerData.UserId} </h2>

        <h1> {"Level " + playerData.Level} </h1>

        <h2> {"Experience [" + playerData.Exp + "/" + playerData.MaxExp + "]"}</h2>

        <div className="expBar">
          <div className = "innerBar" style = {{ width: `${(playerData.Exp/playerData.MaxExp)*100}%` }}> </div>
        </div>
      </div>


      <div className = "Gold">
        <h1> {"Gold Reserves : " + playerData.Gold} </h1>
        <p> 
          A Dragon Warrior's main currency, used to furnish their armor, weapons and other various forms of equipment.
          Gold can also be used to accomadate means of travel, and counter measures that can momentarily decide whether
          one lives or dies. It has a mark of the dragon on it, the ruler of the countinent, titled "The King" had engraved
          this mark because he wished to put respect on the dragon. Despite his confidence in protecting hsi kingdom he believed
          that if push came to shove, the mighty beasts that lit the Apocalypse on fire could wipe out humanity if they put
          their minds to it. It is a coin made from real Gold mined from the depths of the harrowing dungeons humanity was forced
          to adapt to
        </p>
      </div>

      <div className="Gems">
        <h1> {"Gem Reserves : " + playerData.Gems}</h1>
        <p> 
          A Dragon Warrior's Wealth, used to purchase assets that Gold simply can not buy 
          Gems are crystals made directly from the purest forms of mana, similar to the conjoined wavelengths of light
          Gems are crystal Clear with the very inside of them containing a refractive index of 1.003, it's outside reflects
          a soft blue hue and are shaped as their name. Mysteriously they have a chance of forming after the death
          of a creature infused with mana, or monsters for short. After further study the age of said monster determines the amount
          of gems that are formed instead of it's quality. The use of gems have no integrated their way into every day practice, 
          replacing the now relatively dangerous usage of electricity, and magnifying reserves of water.
        </p>
      </div>
    </div>

   
    
  )


  
}

export default App;