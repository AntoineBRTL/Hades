export class AdminCLIHelper
{
    private helper:string = `
    
    Hades CLI helper:

    [option] [value]

    -b [command]    --brodcast      -- Brodcasts [command].
    -c [port]       --command       -- Enters command mode for the machine [port].
    -d [port]       --disconnect    -- Shutdowns the client on the machine [port].
    -e              --exit          -- Exits Hades.
    -h              --help          -- Displays help.
    -i              --info          -- Logs informations.
    -l              --list          -- Lists all machines.
    `;

    public constructor()
    {
        console.log(this.helper);
    }
}