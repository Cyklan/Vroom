import { SceneLoader } from "@babylonjs/core";
import { ModelList } from "./ModelList";

export namespace AssetImporter {
  export namespace Cars {
    export const firetruck = () => importMeshFromFile(ModelList.Paths.Cars, ModelList.Models.Car.Firetruck)
  }
}

async function importMeshFromFile(path: string, model: string) {
  const result = await SceneLoader.ImportMeshAsync(null, path, model)
  const body = result.meshes[0]

  return body;
}