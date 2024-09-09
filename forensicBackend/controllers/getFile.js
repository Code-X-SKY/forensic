const path = require('path')
exports.getImage = async (req, res) => {
    const image = req.params.image;
    const myPath = path.resolve(process.cwd(), "uploads", image);
    res.sendFile(myPath);
}

exports.getLogo = async (req, res) => {
    const image = req.params.image;
    const myPath = path.resolve(process.cwd(), "", image);
    res.sendFile(myPath);
}

exports.getFlag = async (req, res) => {
    const image = req.params.image;
    const myPath = path.resolve(process.cwd(), "flags", image);
    res.sendFile(myPath);
}
