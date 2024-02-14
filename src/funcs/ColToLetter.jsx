export default function colToLetter(col) {
    return String.fromCharCode(`${col}`.charCodeAt(0)+49)
}