const { script, command } = require("@polycuber/script.cli")
const kubectl = require("./script.kubectl")

script(() => {
   const pod = kubectl.pod("stateful-dpl-d479f9565-wpxnf")
   //pod.command.exec('tasklist /NH')
   //pod.command.call('tasklist', '/NH')
   //console.log("tasklist", pod.command.read.exec('tasklist /NH'))
   console.log("pods:", kubectl.pods.names("default"))
})
