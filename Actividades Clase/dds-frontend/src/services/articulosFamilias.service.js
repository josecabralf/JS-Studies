import axios from "axios";

const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulosfamilias";

async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}

async function BuscarPorID(item){
  const resp = await axios.get(urlResource + `/${item.IdArticuloFamilia}`)
  return resp
}

export const articulosfamiliasService = {
  Buscar, BuscarPorID
};
