package Alvura.backend.controller;

import Alvura.backend.model.Produto;
import Alvura.backend.service.ProdutoService;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*") // Deixamos aberto com "*" temporariamente para sua colega testar sem bloqueios
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    // Rota para o frontend pegar os produtos (GET)
    @GetMapping
    public List<Produto> listarProdutos() {
        return produtoService.listarTodos();
    }

    // Rota para cadastrar um produto novo (POST)
    @PostMapping
    public Produto cadastrarProduto(@RequestBody Produto produto) {
        return produtoService.salvar(produto);
    }
    // NOVA ROTA: Atualizar produto existente
    @PutMapping("/{id}")
    public Produto atualizarProduto(@PathVariable Long id, @RequestBody Produto produto) {
        produto.setId(id); // Garante que o produto atualizado mantenha o ID da URL
        return produtoService.salvar(produto);
    }

    // NOVA ROTA: Deletar produto
    @DeleteMapping("/{id}")
    public void excluirProduto(@PathVariable Long id) {
        produtoService.excluir(id);
    }
}