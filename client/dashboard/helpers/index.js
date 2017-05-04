/**
 * [Transform one or more image to base64 string]
 * @param  {[array]} files [files to be transformed]
 * @return {[array]} with single or multiple images transformed to base64
 */
export default function base64Img(files){

  let allFiles = []
  for (let i = 0; i < files.length; i++) {
    let reader = new FileReader();
    reader.readAsDataURL(files[i]);
    reader.onload = () => {

      let fileInfo = {
        name: files[i].name,
        type: files[i].type,
        size: Math.round(files[i].size / 1000)+' kB',
        base64: reader.result,
        file: files[i]
      }
      allFiles.push(fileInfo);
    }
  }
  return allFiles;
}
