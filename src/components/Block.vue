<script>
    import sha256 from "sha256"

    export default class Block {

        constructor(index, timestamp, data, previousHash ='') {
            this.index = index;
            this.timestamp = timestamp;
            this.data = data;
            this.previousHash = previousHash;
        }

    }

</script>