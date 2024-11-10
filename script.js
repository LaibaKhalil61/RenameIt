import minimist from "minimist"
import fs from "fs"
import path from "path"
// Helper function
const validateDirectoryPath = (dir) => {
    fs.access(dir, fs.constants.F_OK, (err) => {
        if (err) {
            console.log("Error : Invalid path")
            process.exit(1);
        }
        else {
            fs.stat(dir, (err, stats) => {
                if (err) {
                    console.log("Error : ", err);
                    process.exit(1);
                }
                else if (stats.isFile()) {
                    console.log("Error : not a directory path")
                    process.exit(1)
                }
            })
        }
    })
}
const changeNames = (dir,options) => {
    try {
        const fsDirent = fs.readdirSync(dir, { withFileTypes: true });
        const files = fsDirent.filter((each_file) => {
            return each_file.isFile();
        })
        if (files.length == 0) {
            console.log("No files found ");
            process.exit(1)
        }
        files.forEach((file) => {
            let filename = file.name;
            if (options.prefix.length >= 1) {
                filename = filename[0] === '.' ? filename[0] + options.prefix + "_" + filename.slice(1) : options.prefix + filename;
            }
            if (options.extension.length >= 1) {
                filename = filename[0] === '.' ? filename +"."+options.extension : filename.slice(0,filename.indexOf('.')) + "." + options.extension;
            }
            if (options.number) {
                filename = `${path.basename(filename)}_${files.indexOf(file) + 1}.${path.extname(filename)}`
            }
            const oldPath = `${dir}/${file.name}`
            const newPath = `${dir}/${filename}`
            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.log("Error : Renaming the files")
                    process.exit(1)
                }
            })
        })
    } catch (err) {
        console.log("Error : reading the directory",err.message)
    }

}

const args = minimist(process.argv.slice(2))
const dirname = args.dir;
if (!dirname) {
    console.log(`
        node Filename --dir <DIRECTORY NAME> <--prefix <PREFIX> || --extension <EXTENSION> || --number >

        Optional Arguments:
        Give Prefix or Extension or Number

        Examples :
        node file --dir target --prefix new
        node file --dir records --extension txt
        `)
    process.exit(1);
}
const options = {
    prefix : args.prefix || '',
    extension : args.extension || '',
    number : args.number || false
}

validateDirectoryPath(dirname);
changeNames(dirname,options);
