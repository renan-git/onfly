import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
    IExecuteFunctions,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
        displayName: 'Random',
        name: 'Random',
        // svg para o node
        icon: 'file:Onfly.svg',
        group: ['transform'],
        version: 1,
        description: 'Consume Random API',
        defaults: {
            name: 'True Random Number Generator',
        },
        inputs: ['main'],
        outputs: ['main'],
		properties: [
            // input de entrada valor minimo
            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                default: 1,
                required: true,
                typeOptions: {
                    numberPrecision: 0, // considera numero inteiro, ou seja, sem casas decimais
                },
                description: 'Minimium value',
            },
            // input de entrada valor maximo
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                default: 100,
                required: true,
                typeOptions: {
                    numberPrecision: 0, // considera numero inteiro, ou seja, sem casas decimais
                },
                description: 'Maximum value',
            },
		],
	};
	
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        let responseData;
        const returnData = [];
        // parametros para realizar a requisicao
        const min = this.getNodeParameter('min', 0) as number;
        const max = this.getNodeParameter('max', 0) as number;
        const num = 1;
        const col = 1;
        const base = 10; 
        const format = "plain";
        const rnd = "new";

        const options = {
            headers: {
                'Accept': 'application/json',
            },
            method: 'GET' as const,
            // endpoint com os parametros setados
            uri: `https://www.random.org/integers/?num=${num}&min=${min}&max=${max}&col=${col}&base=${base}&format=${format}&rnd=${rnd}`,
            json: true,
        };
        // requisicao
        responseData = await this.helpers.request(options);
        const randomNumber = parseInt(responseData as string, 10);
        // numero aleatorio a ser exibido no resultado
        returnData.push(
            {Result : randomNumber}
        );

        return [this.helpers.returnJsonArray(returnData)];
	}
}