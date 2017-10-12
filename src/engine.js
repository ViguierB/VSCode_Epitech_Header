var path = require('path');
var vscode = require('vscode');
var moment = require('moment');

const headerPattern = `
 $FILE_NAME for $PROJET_NAME in $PWD

 Made by $NAME
 Login   <$EMAIL>

 Started on  $STARTED_ON
 Last update $LAST_UPDATE

`.substring(1);

var _extractEpiHeader = (text, delims) => {
    var lines = text.split('\n');

    if (lines[0] === delims[0] && lines[8] === delims[2]) {
        var res = "";
        for (var i = 0; i <= 8; i++) {
            res += lines[i] + '\n';
        }
        return res;
    }
};

var getUserName = () => {
    return vscode.workspace.getConfiguration().get('EpiHeader.name') || process.env['USER'] || 'karimou';
};

var getUserEmail = () => {
    return vscode.workspace.getConfiguration().get('EpiHeader.email') || getUserName().replace(' ', '.') + '@epitech.eu';
};

var getCurrentDate = () => {
    return moment().format('ddd MMM DD HH:mm:ss YYYY');
}

var _generateHeader = (fileName, delims, projectName) => {
    var nowDate = getCurrentDate();

    var splited = headerPattern.replace('$FILE_NAME', path.basename(fileName))
                                .replace('$PROJECT_NAME', projectName)
                                .replace('$PWD', path.dirname(fileName))
                                .replace('$NAME', getUserName())
                                .replace('$EMAIL', getUserEmail())
                                .replace('$STARTED_ON', newDate + " " + getUserName())
                                .replace('$LAST_UPDATE', newDate + " " + getUserName()).split('\n');
    var header = "";
    for (var i = 0; i <= 8; i++) {
        if (i === 0) {
            splited[i] = delims[0];
        } else if (i === 8) {
            splited[i] = delims[2];
        } else {
            splited[i] = delims[1] + splited[i];
        }
        header += splited[i];
    }
    return header;
};

var _insertHeader = (document, delims, projectName) => {
    console.log(document);

    var generatedHeader = _generateHeader(document.fileName, delims, projectName);

}

var _updateEpiHeader = (editor, delims) => {

    return editor.replace(new vscode.Range(7, 0, 7, 9999), delims[1] + ' Last update ' + getCurrentDate() + " " + getUserName());
};

module.exports = {
    extractEpiHeader: _extractEpiHeader,
    generateHeader: _generateHeader,
    updateEpiHeader: _updateEpiHeader,
    insertHeader: _insertHeader
}