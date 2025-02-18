const Shell = require('node-powershell')

const runAsAdmin = async (command) => {
  const usePowerShell = typeof command === 'string'
  const shell = new Shell({})
  await shell.addCommand('Start-Process')

  if (usePowerShell) await shell.addArgument('PowerShell')
  await shell.addArgument('-Verb')
  await shell.addArgument('RunAs')
  await shell.addArgument('-PassThru')
  if (usePowerShell) await shell.addArgument('-Wait')

  if (usePowerShell) {
    await shell.addArgument('-ArgumentList')
    await shell.addArgument(command)
  }

  await shell.invoke()
  return await shell.dispose()
}

const linuxActive = "dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart";
const machineActive = "dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart";
const linuxDisable = "dism.exe /online /disable-feature /featurename:Microsoft-Windows-Subsystem-Linux /norestart";
const machineDisable = "dism.exe /online /disable-feature /featurename:VirtualMachinePlatform /norestart";

const buttonActive = document.querySelector('.active');
buttonActive.onclick = () => runAsAdmin(`"${linuxActive}; ${machineActive}"`);
const buttonDisable = document.querySelector('.disable');
buttonDisable.onclick = () => runAsAdmin(`"${linuxDisable}; ${machineDisable}"`);