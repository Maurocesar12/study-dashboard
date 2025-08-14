import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

type Props = {
  search: string;
  onSearch: (v: string) => void;
  status: string;
  onStatus: (v: string) => void;
  category: string;
  onCategory: (v: string) => void;
  orderBy: string;
  onOrderBy: (v: string) => void;
};

const CATEGORIES = ['Front-end','Back-end','Mobile','Web Development','UI/UX','Outros'];

export default function FiltersBar({ search, onSearch, status, onStatus, category, onCategory, orderBy, onOrderBy }: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      <Input
        placeholder="Pesquisar por título/descrição…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        aria-label="Pesquisar cursos"
      />

      <Select value={status} onValueChange={onStatus}>
        <SelectTrigger aria-label="Filtrar por status"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="not-started">Não Iniciado</SelectItem>
          <SelectItem value="in-progress">Em Progresso</SelectItem>
          <SelectItem value="completed">Concluído</SelectItem>
        </SelectContent>
      </Select>

      <Select value={category} onValueChange={onCategory}>
        <SelectTrigger aria-label="Filtrar por categoria"><SelectValue placeholder="Categoria" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={orderBy} onValueChange={onOrderBy}>
        <SelectTrigger aria-label="Ordenar por"><SelectValue placeholder="Ordenar por" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="updatedAt_desc">Atualização (recente)</SelectItem>
          <SelectItem value="createdAt_desc">Criação (recente)</SelectItem>
          <SelectItem value="progress_desc">Progresso (maior)</SelectItem>
          <SelectItem value="title_asc">Título (A–Z)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
