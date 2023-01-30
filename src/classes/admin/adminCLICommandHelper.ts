export class AdminCLICommandHelper
{
    private helper:string = `
    
    Hades CLI command mode helper:

    [options] <value>

    -h              --help          -- displays help
    -e              --exit          -- exits command mode
    `;

    public constructor()
    {
        console.log(this.helper);
    }
}