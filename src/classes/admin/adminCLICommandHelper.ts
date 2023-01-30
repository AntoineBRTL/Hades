export class AdminCLICommandHelper
{
    private helper:string = `
    
    Hades CLI command mode helper:

    [option] [value]

    -e              --exit          -- Exits command mode.
    -h              --help          -- Displays help.
    `;

    public constructor()
    {
        console.log(this.helper);
    }
}