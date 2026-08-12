/* === FILE: app-terminal-commands.js === */
/**
 * WebOS v0.7 Terminal Command Handler
 */
(function () {
  function handleCommand(cmdStr) {
    const trimmed = cmdStr.trim();
    if (!trimmed) return "";

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    switch (cmd) {
      case "help":
        return `Available commands:
  help       - Show this help screen
  ls         - List files in current directory
  date       - Show current date & time
  whoami     - Show logged-in user
  echo <txt> - Echo text back to screen
  clear      - Clear terminal screen
  neofetch   - Display WebOS system info
  mbank      - Show current Mbank balance`;

      case "ls":
        return "Documents/  Downloads/  Pictures/  Desktop/";

      case "date":
        return new Date().toString();

      case "whoami":
        return "webos-user";

      case "echo":
        return args;

      case "neofetch":
        let memory = "3.2 GB / 8 GB (Black U5000 @ 5000 MHz)";
        if (window.monitorMemory && typeof window.monitorMemory.getRAMUsage === "function") {
          const ram = window.monitorMemory.getRAMUsage();
          memory = `${ram.usedStr} / 8 GB (Black U5000 @ 5000 MHz)`;
        }

        let uptimeStr = "12s";
        if (window.monitorSystem && typeof window.monitorSystem.getUptime === "function") {
          uptimeStr = window.monitorSystem.getUptime().formatted;
        }

        const width = window.screen ? window.screen.width : 2880;
        const height = window.screen ? window.screen.height : 1800;

        return `
  ██╗  ██╗███████╗██████╗  ██████╗ ███████╗
  ██║  ██║██╔════╝██╔══██╗██╔═══██╗██╔════╝
  ██║  ██║█████╗  ██████╔╝██║   ██║███████╗
  ██║  ██║██╔══╝  ██╔══██╗██║   ██║╚════██║
  ╚█████╔╝███████╗██████╔╝╚██████╔╝███████║
   ╚════╝ ╚══════╝╚═════╝  ╚═════╝ ╚══════╝

  OS: WebOS v0.7.4.3 (64-bit Browser Runtime)
  Host: Bolt B350-M
  Kernel: WebOS Kernel 1.0
  CPU: Cyclone 1st Gen X9 (2C/4T) @ 2.7 GHz
  GPU: Star R Pro — 2GB GDDR5
  Memory: ${memory}
  Storage: 89 GB / 256 GB (Bolt NV-256)
  Display: ${width}×${height} @ 220 PPI
  Uptime: ${uptimeStr}
  Shell: WebOS Terminal 1.0`;

      case "mbank":
        const bal = window.storeWallet ? window.storeWallet.getBalance() : 50.00;
        return `Mbank Account: $${bal.toFixed(2)}`;

      case "owner":
      case "hanish":
        return `WebOS — Created & Built by HANISH\n  ██╗  ██╗ █████╗ ███╗   ██╗██╗███████╗██╗  ██╗\n  ██║  ██║██╔══██╗████╗  ██║██║██╔════╝██║  ██║\n  ███████║███████║██╔██╗ ██║██║███████╗███████║\n  ██╔══██║██╔══██║██║╚██╗██║██║╚════██║██╔══██║\n  ██║  ██║██║  ██║██║ ╚████║██║███████║██║  ██║\n  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚══════╝╚═╝  ╚═╝`;

      case "clue":
        return `[Void Whisper]: The fourth digit of the developer password is 0.`;

      case "puzzle":
        return `The 4 digits unlock Settings → For Developers.\nClues lead to: 1) License, 2) CPU Monitor, 3) Mbank, 4) 'clue' command.`;

      case "digits":
        return `Digits discovered across WebOS: [9] [6] [1] [0]`;

      case "matrix":
        return `Wake up, Neo... WebOS has you.\nFollow the white rabbit. 🐇\n01010111 01100101 01100010 01001111 01010011`;

      case "coffee":
        return `☕ Here is a warm cup of coffee for the tired developer. Keep up the great work!`;

      case "sudo":
        return `Nice try. This incident will be reported to HANISH.`;

      default:
        return `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
  }

  window.handleTerminalCommand = handleCommand;
})();

