export type ApiType = {
  id: number;
  tipo: string;
  titulo: string;
  introducao: string;
  data_publicacao: string;
  produto_id: number;
  produtos: string;
  editorias: string;
  imagens: string;
  produtos_relacionados: string;
  destaque: boolean;
  link: string;
};

export type ApiContextType = {
  ibgeData: ApiType[];
};

export type News = {
  id: number;
  title: string;
  description: string;
  dataPubli: string;
};
