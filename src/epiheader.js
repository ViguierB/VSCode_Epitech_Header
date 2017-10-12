var vscode = require('vscode');
var delims = require('./delims.js');
var engine = require('./engine.js');

var updateHeader = (evt) => {
    var document = evt.document;
    var extracted = engine.extractEpiHeader(document.getText(), delims.getDelim(document.languageId));
    
    evt.waitUntil(
        Promise.resolve(
            extracted && delims.isSupported(document.languageId) ? [
                engine.updateEpiHeader(vscode.TextEdit, delims.getDelim(document.languageId))
            ] : []
        )
    );
    
};

var addHeader = () => {
    var active = vscode.window.activeTextEditor;
    var document = active.document;

    var delims = delims.getDelims(document.languageId);
    if (typeof delim !== 'undefined') {
        var extracted = engine.extractEpiHeader(document.getText(), delims.getDelim(document.languageId));
        
    } else {
        vscode.window.showInformationMessage(
            `Unknow language ${document.languageId}`
        )
    }
};

function activate(context) {
    var addCommand = vscode.commands.registerCommand('epiheader.addHeader', addHeader);

    context.subscriptions.push(addCommand);

    vscode.workspace.onWillSaveTextDocument(updateHeader, null, context.subscriptions);
}

exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;