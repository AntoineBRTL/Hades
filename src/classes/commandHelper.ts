/**
 * Displays information about arguments in the command line tool.
 */
export class CommandHelper
{
    private helpers:string = `
    hades <port> [<ip>] [options]

    options:
    
    -a              -- starts hades as administrator
    -c              -- starts hades as client, [<ip>] required
    `;

    /**
     * Creates a command helper.
     */
    public constructor()
    {
        console.log(this.helpers);
    }
}