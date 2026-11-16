package Alvura.backend.service;

import Alvura.backend.model.Produto;
import Alvura.backend.repository.ProdutoRepository;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> listarTodos() {
        return produtoRepository.findAll(); // Faz um "SELECT * FROM produto"
    }

    public Produto salvar(Produto produto) {
        return produtoRepository.save(produto); // Faz um "INSERT INTO produto"
    }
    
    public void excluir(Long id) {
        produtoRepository.deleteById(id); // Faz um "DELETE FROM produto WHERE id = ?"
    }
}