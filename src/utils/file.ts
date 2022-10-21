import fs from 'fs';

export const deleteFiles = async (filename: string) => {
    try {
        //verifica se o arquivo existe
        await fs.promises.stat(filename);
    } catch (err) {
        console.log(`[file.ts] deleteFiles error:  ${err}`);
        return;
    }
    //remove se o arquivo existir
    await fs.promises.unlink(filename);
}