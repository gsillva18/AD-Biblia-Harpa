import React, { useState } from 'react'
import BarMain from '../../components/BarMain';
import Bible from '../../components/Bible'
import Harp from '../../components/Harp'
import Home from '../../components/Home';

function PageStart() {

  const [componente, setComponente] = useState("home");

  return (
    <div>
      <BarMain componete={componente} setComponente={setComponente} />
      {componente === "home" ? (
        <Home />
      ) : componente === "bible" ? (
        <Bible />
      ) : (
        <Harp />
      )

      }

    </div>
  );
}

export default PageStart;