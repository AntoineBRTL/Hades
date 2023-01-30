export class AdminCLIHelper
{
    private helper:string = `
    
    Hades CLI helper:

    [options] <value>

    -h              --help          -- displays help
    -e              --exit          -- exits Hades
    -l              --list          -- lists all machines as <port> : <ip>
    -c <port>       --command       -- enters command line mode for the machine <port>
    -d <port>       --disconnect    -- closes socket connection of the machine <port>
    `;

    public constructor()
    {
        console.log(this.helper);
    }
}