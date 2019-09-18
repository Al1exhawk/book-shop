export class ApplicationException extends Error {
    getStatus() {
        return 400;
    }
}
