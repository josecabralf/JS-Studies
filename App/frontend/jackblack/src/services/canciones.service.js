import axios from "axios";

const urlResource = "http://127.0.0.1:4000/api/canciones";

async function Buscar(Nombre) {
  const resp = await axios.get(urlResource, {
    params: { Nombre },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdCancion);
  return resp.data;
}

async function Bajar(item) {
  const resp = await axios.delete(urlResource + "/" + item.IdCancion);
  return resp.data;
}

async function Grabar(item) {
  if (item.IdCancion === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdCancion, item);
  }
}

const cancionesService = {
  Buscar,BuscarPorId,Grabar,Bajar
};

export default cancionesService;
