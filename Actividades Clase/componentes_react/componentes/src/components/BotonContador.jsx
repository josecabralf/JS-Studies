import React, {useState, useEffect} from "react";

function BotonCont() {
    const [count, setCount] = useState(0);
    useEffect(() => console.log(`Se realizaron ${count} clicks`), [count]);

    return (
        <div id="botones">
            <h2 className="texto-btn">Clickeaste {count} veces</h2>
            <button className="boton-suma" onClick={() => setCount(count+1)}> SUMA 1 </button>
            <button className="boton-10" onClick={() => setCount(count+10)}> SUMA 10 </button>
            <button className="boton-0" onClick={() => setCount(0)}> VUELVE A 0 </button>
            <button className="boton-Demasido" onClick={() => setCount(count*100)}> SUMA DEMASIADO</button>
        </div>
    );
}

export default BotonCont;