class Serializer {
    constructor() {
        this.data = [];
    }

    addInt(data, byteLength) {
        // NB: JS will treat byteLength as byteLength%4.
        // I don't think it's rotating.  I think it just doesn't shift
        // outside of the integers 4 byte space.
        while(byteLength--) {
            const byte = data >>> byteLength * 8 & 0xFF;
            this.data.push(byte);
        }
    }

    addString(data, byteLength) {
        let idx = 0;
        while(idx < byteLength) {
            const byte = data.charCodeAt(idx++);
            this.data.push(byte);
        }
    }

    addData(data, byteLength) {
        this.data.push(...data.slice(0, byteLength));
    }
}

function hexDump(data) {
    let str = '';
    for(const byte of data) {
        str += byte.toString(16).padStart(2, '0') + ' ';
    }
    return str.slice(0, -1);
}

function pushDownload(filename, data) {
    const encodedData = btoa(String.fromCharCode(...data));

    const link = document.createElement('a');
    link.setAttribute('href', 'data:application/octet-stream;base64,' + encodedData);
    link.setAttribute('download', filename);

    link.click();
}
