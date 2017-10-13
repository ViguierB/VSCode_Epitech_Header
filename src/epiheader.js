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

    var delim = delims.getDelim(document.languageId);
    if (typeof delim !== 'undefined') {
        var extracted = engine.extractEpiHeader(document.getText(), delim);
        vscode.window.showInputBox({prompt: 'Pour quel projet ?'}).then((projectName) => {
            if (!projectName) {
                return;
            }
            var newHeader = engine.generateHeader(document.fileName, delim, projectName);
            active.edit(editor => {
                if (typeof extracted === 'undefined') {
                    editor.insert(new vscode.Position(0, 0), newHeader + "\n");
                } else {
                    editor.replace(new vscode.Range(0, 0, 9, 0), newHeader);
                }
            });
        });
        
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