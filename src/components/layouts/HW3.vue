<template>
    <div class="container">
        <div class="row">

            <h1 class="col-md-12">WEbRTC Chat</h1>
            <hr>
            <pre>

            </pre>

        </div>
    </div>
</template>

<script>
    //    import Peer from './../../vendors/peer'
    import Peer from 'peerjs';

    export default {
        name: 'HW3',
        components: {
        },
        data() {
            return {
                simple: '',
                key: ''

            }
        },
        created() {

            this.peer = new Peer({key: 't6ll478mrrv34n29'})
        },
        methods: {
            connect: function () {
                const theirID = document.getElementById('theirPeerID').value
                const theirBlock = document.getElementById('theirBlockKey').value

                // Update the global block key used to decrypt
                theirBlockKey = theirBlock

                // Connect to a new peer
                const client = peer.connect(theirID);

                // When the connection is open, add any messages to the chatbox
                client.on('open', function () {
                    // Let us know we've connected successfuly
                    simple.addMessage(`Connected to ${theirID}!`)

//                    client.on('data', function (data) {
//                        writeMessage(data, simple)
//                    })
                })
            },
            send: function () {
                // Get message and clear input
                const val = document.getElementById('message').value
                document.getElementById('message').value = ''

                // Send message to chatbox unencrypted so we remember what we've said
                simple.addMessage(`Me: ${val}`)

                // Encrypt the message
//                const msg = CryptoJS.AES.encrypt(val, key.replace(/\s/g, ''))

                // Send the encrypted message to the peer
                if (rcon) {
//                    rcon.send(msg.toString())
                } else {
//                    simple.addMessage(`Oops... You're trying to send a message before connecting to a peer.`)
                }
            },




            skylink() {

            },
            peerId() {


            }

        }

    }


</script>

<style scoped>

</style>
