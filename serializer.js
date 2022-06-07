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

class Deserializer {
    constructor(data) {
        this.data = data;
        this.position = 0;
    }

    pullInt(byteLength) {
        let result = 0;
        while(byteLength--) {
            result <<= 8;
            const byte = this.data[this.position++];
            result |= byte;
        }
        return result;
    }

    pullString(byteLength) {
        const result = String.fromCharCode(...this.pullData(byteLength));
        return result;
    }

    pullData(byteLength) {
        const result = this.data.slice(this.position, this.position + byteLength);
        this.position += byteLength;
        return result;
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

function readUpload(file, callback) {
    const reader = new FileReader();
    reader.onload = () => {
        callback(new Uint8Array(reader.result));
    }
    reader.readAsArrayBuffer(file);
}
