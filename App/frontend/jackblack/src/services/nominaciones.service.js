import axios from "axios";

const urlResource = "http://127.0.0.1:4000/api/nominaciones";

async function Buscar(NombrePremio) {
    const resp = await axios.get(urlResource, {
        params: { NombrePremio },
    });
    return resp.data;
}

async function BuscarPorId(item) {
    const resp = await axios.get(urlResource + "/" + item.IdNominacion);
    return resp.data;
}

async function Bajar(item) {
    const resp = await axios.delete(urlResource + "/" + item.IdNominacion);
    return resp.data;
}

async function Grabar(item) {
    if (item.IdNominacion === 0) {
        await axios.post(urlResource, item);
    } else {
        await axios.put(urlResource + "/" + item.IdNominacion, item);
    }
}

const nominacionesService = {
    Buscar, BuscarPorId, Grabar, Bajar
};

export default nominacionesService;
