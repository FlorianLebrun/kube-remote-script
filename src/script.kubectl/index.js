const cli = require("@polycuber/script.cli")

function pod(podName) {

   const command = {
      exec(command, options) {
         cli.command.exec(`kubectl exec "${podName}" -- ${command}`, options)
      },
      call(program, args, options) {
         cli.command.call("kubectl", ["exec", podName, "--", program, ...args], options)
      },
      read: {
         exec(command, options) {
            return cli.command.read.exec(`kubectl exec "${podName}" -- ${command}`, options)
         },
         call(program, args, options) {
            return cli.command.read.call("kubectl", ["exec", podName, "--", program, ...args], options)
         },
      },
   }

   const directory = {
      filenames(path) {

      }
   }
   return { command, directory }
}

const pods = {
   list(namespace) {
      const args = ['get', 'pods', '--output=json']
      if (namespace) args.push('--namespace', namespace)
      else args.push('--all-namespaces')
      return JSON.parse(cli.command.read.call('kubectl', args)).items
   },
   names(namespace) {
      const res = pods.list(namespace)
      return res.map(x => x.metadata.name)
   }
}
module.exports = {
   pod,
   pods,
}
