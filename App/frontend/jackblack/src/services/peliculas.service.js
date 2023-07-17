import axios from "axios";

const urlResource = "http://127.0.0.1:4000/api/peliculas";

async function Buscar(Titulo) {
  const resp = await axios.get(urlResource, {
    params: { Titulo },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdPelicula);
  return resp.data;
}

async function Bajar(item) {
  const resp = await axios.delete(urlResource + "/" + item.IdPelicula);
  return resp.data;
}

async function Grabar(item) {
  if (item.IdPelicula === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdPelicula, item);
  }
}

const peliculasService = {
  Buscar,BuscarPorId,Grabar,Bajar
};

export default peliculasService;
