const hashes = ['##', '##','##'];
const slashes = ['/*', '**','*/'];
const semicolons = [';;', ';;',';;'];
const parens = ['(*', '**','*)'];
const dashes = ['-- ', '--',' --'];
const percents = ['%% ', '%%',' %%'];

const languageDemiliters = {
    'c': slashes,
    'coffeescript': hashes,
    'cpp': slashes,
    'css': slashes,
    'dockerfile': hashes,
    'fsharp': parens,
    'go': slashes,
    'groovy': slashes,
    'haskell': dashes,
    'ini': semicolons,
    'jade': slashes,
    'java': slashes,
    'javascript': slashes,
    'javascriptreact': slashes,
    'latex': percents,
    'less': slashes,
    'lua': semicolons,
    'makefile': hashes,
    'objective-c': slashes,
    'ocaml': parens,
    'perl': hashes,
    'perl6': hashes,
    'php': slashes,
    'plaintext': hashes,
    'powershell': hashes,
    'python': hashes,
    'r': hashes,
    'ruby': hashes,
    'rust': slashes,
    'scss': slashes,
    'shellscript': hashes,
    'sql': hashes,
    'swift': slashes,
    'typescript': slashes,
    'typescriptreact': slashes,
    'xsl': slashes,
    'yaml': hashes
};

module.exports = {
    getDelim: (languageId) => {
        return (languageDemiliters[languageId]);
    },
    isSupported: (languageId) => {
        return (typeof languageDemiliters !== 'undefined');
    }
};