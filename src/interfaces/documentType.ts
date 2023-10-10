export interface IDocumentType {
	idTipoDocumento: number;
	tipoDocumento: string;
	abreviatura: string;
	estadoRegistro: boolean;
	maxNumDigito?: number;
}
