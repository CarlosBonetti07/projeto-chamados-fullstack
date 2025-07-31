import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para ngModel, ngForm
import { Component, OnInit } from '@angular/core';
import { Chamado } from '../../../models/chamado.model';
import { Analista } from './../../../models/analista.model';
import { ChamadoService } from '../../../services/chamado.service';
import { AnalistaService } from '../../../services/analista.service';
import { HttpClientModule } from '@angular/common/http';
import { AzureWorkitemAutocompleteComponent } from '../../azure-workitem-autocomplete/azure-workitem-autocomplete.component';
import { AzureRepoBranchTreeComponent } from '../../azure-repo-branch-tree/azure-repo-branch-tree.component';
import { ChamadoBranch } from '../../../models/chamadoBranches.model';
import {ChamadoBranchService} from '../../../services/chamado-branch.service';
import { MessageService } from '../../../services/message.service';


@Component({
  selector: 'app-chamado-component',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, AzureWorkitemAutocompleteComponent, AzureRepoBranchTreeComponent
    
  ],
  templateUrl: './chamado-component.component.html',
  styleUrl: './chamado-component.component.css'
})

export class ChamadoComponent implements OnInit {
  chamados: Chamado[] = [];
  chamado: Chamado = this.getNovoChamado();
  editando = false;

  constructor(private chamadoService: ChamadoService, 
              private analistaService: AnalistaService, 
              private chamadoBranchService: ChamadoBranchService,
              private message: MessageService) {}

  ngOnInit(): void {
    this.listarChamados();
    this.listarAnalistas();
    
/*
    if (!this.chamado.analista) {
      this.chamado.analista = { id: 0, nome: '', fotoBase64: '' };
    }
*/
  }

  getNovoChamado(): Chamado {
    return {
      titulo: '',
      estado: 'DESENVOLVIMENTO',
      status: 'ABERTO',
      tipo: 'TAREFA',
      prioridade: 'MEDIA',
      analista: {
        id: 0,
        nome: '',
        fotoBase64: ''
      }
    };
  }

  listarChamados(): void {
    this.chamadoService.listar().subscribe(data => {
      this.chamados = data;
    });
  }

  salvarOuAtualizar(): void {
    if (this.editando && this.chamado.id) {
      this.chamadoService.atualizar(this.chamado.id, this.chamado).subscribe(() => {
        this.salvarBranchesLote();
        this.resetarFormulario();
        this.listarChamados();
        this.message.success('Chamado atualizado com sucesso!');
      });
    } else {
      this.chamadoService.criar(this.chamado).subscribe(() => {
        this.salvarBranchesLote();
        this.resetarFormulario();
        this.listarChamados();
        this.message.success('Chamado criado com sucesso!');
      });
    }
  }

  salvarBranchesLote(): void {
    if (this.chamado.id) {
      this.chamadoBranchService.salvarBranchesLote(this.chamado.id, this.branchesSelecionadas).subscribe(() => {
      });
    }
  }


  editarChamado(chamado: Chamado): void {
    this.chamado = { ...chamado };
    this.search =  this.chamado.analista?.nome || '';
    this.editando = true;
  }

  removerChamado(id: number): void {
    this.chamadoService.deletar(id).subscribe(() => {
      this.listarChamados();
    });
  }

  resetarFormulario(): void {
    this.chamado = this.getNovoChamado();
    this.search = '';
    this.editando = false;
    this.branchesSelecionadas = [];
    this.isCollapsed = true;
  }


    search = '';

  showDropdown = false;

  analistas: Analista[] = [];
  filteredAnalistas: Analista[] = [];
  
  listarAnalistas() {
    this.analistaService.listar().subscribe(data => this.analistas = data);
  }
/*
  get filteredAnalistas() {
    const term = this.search.toLowerCase();
    return this.analistas.filter(a => a.nome.toLowerCase().includes(term));
  }
*/
  onFocus() {
    this.showDropdown = true;
    this.filterAnalistas();
  }

  onBlur() {
    // Peque o timeout pra permitir o clique no item antes de fechar
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  onSearchChange() {
    this.filterAnalistas();
  }

  filterAnalistas() {
    const term = this.search.toLowerCase();
    this.filteredAnalistas = this.analistas.filter(a =>
      a.nome.toLowerCase().includes(term)
    );
  }

  select(analista: Analista) {
    this.chamado.analista = analista;
    this.search = analista.nome;
    this.showDropdown = false;
  }

  onItemSelected(item: any) {
    this.chamado.linkAzure = item.url;
  }
  // Fazer carregar da base de dados
  // Configurações do Azure Workitem Autocomplete
  public org = 'Datainfo-LABS-Epagri';
  public project = 'Gestão Epagri';
  public pat = '2EKCtMdI2WPwdKD1Mu2bW1GyHsrSmhkqXL3r7KVHKKfxTYG5CwuCJQQJ99BGACAAAAAs50ayAAASAZDO38xT'; // Personal Access Token


  // Parte responsável por controlar o componente de Branches:
  
  public isCollapsed = true;
  //chamadoSelecionado = 1;
  branchesSelecionadas: ChamadoBranch[] = [];

  get idChamadoAtual(): number {
    return this.chamado?.id ?? 0;
  }


  // ----- Fim componente de Branches -----

}