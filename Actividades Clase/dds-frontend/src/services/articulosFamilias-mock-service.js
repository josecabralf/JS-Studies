import arrayArticuloFamilia from '../datos-mock/articulosfamilias-mock';

// Buscar: devuelve todos los articulos familias
async function Buscar() {
     return arrayArticuloFamilia;
}

//BuscarPorID: busca un articulo familia segun un id
async function BuscarPorId(IdArticuloFamilia) {
      return arrayArticuloFamilia.find((articulofamilia) => articulofamilia.IdArticuloFamilia === IdArticuloFamilia );
}

// Agregar: agrega un articulo familia
async function Agregar(articuloFamilia) {
    articuloFamilia.IdArticuloFamilia = arrayArticuloFamilia.length + 1;  // simula autoincremental
    arrayArticuloFamilia.push(articuloFamilia);
}

// Modificar: Cambia el nombre de un articulo familias
async function Modificar(articuloFamilia) {
    let articuloFamiliaEncontrado = BuscarPorId(articuloFamilia.IdArticuloFamilia);
    if (articuloFamiliaEncontrado) {
        articuloFamiliaEncontrado.Nombre = articuloFamilia.Nombre;
    }
}

// Eliminar: elimina
async function Eliminar(IdArticuloFamilia){
    let articuloFamiliaEncontrado = BuscarPorId(IdArticuloFamilia);
    if (articuloFamiliaEncontrado) {
        arrayArticuloFamilia.splice(arrayArticuloFamilia.indexOf(articuloFamiliaEncontrado), 1);
    }
}

export const articulosFamiliasMockService = {
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
};
