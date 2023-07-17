import axios from "axios";

const urlResource = "http://127.0.0.1:4000/api/personajes";

async function Buscar(Nombre) {
  const resp = await axios.get(urlResource, {
    params: { Nombre },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdPersonaje);
  return resp.data;
}

async function Bajar(item) {
  const resp = await axios.delete(urlResource + "/" + item.IdPersonaje);
  return resp.data;
}

async function Grabar(item) {
  if (item.IdPersonaje === 0) {
    await axios.post(urlResource, item);
    console.log(item);
  } else {
    await axios.put(urlResource + "/" + item.IdPersonaje, item);
  }
}

const personajesService = {
  Buscar,BuscarPorId,Grabar,Bajar
};

export default personajesService;