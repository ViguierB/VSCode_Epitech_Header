var path = require('path');
var vscode = require('vscode');
var moment = require('moment');

const headerPattern = `
 $FILE_NAME for $PROJECT_NAME in $PWD

 Made by $NAME
 Login   <$EMAIL>

 Started on  $STARTED_ON
 Last update $LAST_UPDATE`.substring(1);

const newHeaderPattern = `
 EPITECH PROJECT, $YEAR
 $PROJECT_NAME
 File description:
\tName: $FILE_NAME
\tBy: $NAME ($EMAIL)
\tLast update: $LAST_UPDATE
\t`.substring(1);

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

var _isNewHeader = () => {
    var exp = vscode.workspace.getConfiguration().get('EpiHeader.experimental') || false;

    if (!exp) {
        return false;
    }

    return !vscode.workspace.getConfiguration().get('EpiHeader.old') || true;
};

var getCurrentDate = () => {
    return moment().format('ddd MMM DD HH:mm:ss YYYY');
};

var getYear = () => {
    return moment().subtract(6, 'months').format("YYYY");
};

var _generateHeader = (fileName, delims, projectName) => {
    var nowDate = getCurrentDate();

    var currentHeader = (_isNewHeader() ? newHeaderPattern : headerPattern);
    var splited = currentHeader.replace('$FILE_NAME', path.basename(fileName))
                                .replace('$PROJECT_NAME', projectName)
                                .replace('$PWD', path.dirname(fileName))
                                .replace('$NAME', getUserName())
                                .replace('$EMAIL', getUserEmail())
                                .replace('$YEAR', getYear())
                                .replace('$STARTED_ON', nowDate + " " + getUserName())
                                .replace('$LAST_UPDATE', nowDate + " " + getUserName())
                                .split("\n");
    var header = delims[0] + "\n";
    for (var i = 0; i < splited.length; i++) {
        header += delims[1] + splited[i] + "\n";
    }
    header += delims[2] + "\n";
    return header;
};

var _insertHeader = (document, delims, projectName) => {
    _generateHeader(document.fileName, delims, projectName);
};

var _updateEpiHeader = (editor, delims) => {
    let lines = (_isNewHeader() ? newHeaderPattern : headerPattern).split('\n');
    let updatePosition;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].indexOf("$LAST_UPDATE") !== -1) {
            updatePosition = i+1;
            break;
        }
    }

    if (updatePosition)
        return editor.replace(new vscode.Range(updatePosition, 0, updatePosition, 9999), delims[1] + (_isNewHeader() ? '\tLast update: ' : ' Last update ') + getCurrentDate() + " " + getUserName());
    else
        return editor;
};

module.exports = {
    isNewHeader: _isNewHeader,
    extractEpiHeader: _extractEpiHeader,
    generateHeader: _generateHeader,
    updateEpiHeader: _updateEpiHeader,
    insertHeader: _insertHeader
}