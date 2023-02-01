/**
 * Displays information about arguments in the command line tool.
 */
export class CommandHelper
{
    private helpers:string = `
    hades [option] [value]

    options:

    -a [port]       --admin         -- Starts hades as administrator.
    -c [ip] [port]  --client        -- Starts hades as client required.
    -h              --help          -- Displays help.
    `;

    /**
     * Creates a command helper.
     */
    public constructor()
    {
        console.log(this.helpers);
    }
}