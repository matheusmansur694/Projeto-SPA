// Dados globais
const seriesData = {
    'stranger-things': {
        titulo: 'Stranger Things',
        imagem: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=400&fit=crop',
        descricao: 'Um grupo de amigos se envolve em uma série de eventos sobrenaturais na pacata cidade de Hawkins. Eles enfrentam criaturas monstruosas, agências secretas do governo e se aventuram em dimensões paralelas.'
    },
    'dark': {
        titulo: 'Dark',
        imagem: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop',
        descricao: 'O desaparecimento de crianças em Winden revela os segredos e as conexões sombrias entre quatro famílias, enquanto eles desvendam uma teia de mistérios que abrange três gerações.'
    },
    'la-casa-de-papel': {
        titulo: 'La Casa de Papel',
        imagem: 'https://images.unsplash.com/photo-1567602901358-5ba17615aaeb?w=600&h=400&fit=crop',
        descricao: 'Oito ladrões fazem reféns e se trancam na Casa da Moeda da Espanha enquanto seu líder manipula a polícia para realizar seu plano de imprimir 2,4 bilhões de euros.'
    },
    'black-mirror': {
        titulo: 'Black Mirror',
        imagem: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
        descricao: 'Uma série antológica que explora um futuro tecnológico distópico, onde as inovações mais grandiosas da humanidade colidem com seus instintos mais sombrios.'
    },
    'breaking-bad': {
        titulo: 'Breaking Bad',
        imagem: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop',
        descricao: 'Um professor de química do ensino médio diagnosticado com câncer de pulmão terminal se transforma em um fabricante e vendedor de metanfetaminas para garantir o futuro de sua família.'
    }
};

const linguagensData = {
    'javascript': {
        titulo: 'JavaScript',
        imagem: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop',
        descricao: 'Linguagem de programação interpretada e orientada a objetos,主要用于用于创建 páginas web interativas. É uma das principais tecnologias da World Wide Web.'
    },
    'java': {
        titulo: 'Java',
        imagem: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop',
        descricao: 'Linguagem de programação orientada a objetos desenvolvida pela Sun Microsystems. É conhecida por seu princípio "escreva uma vez, execute em qualquer lugar".'
    },
    'python': {
        titulo: 'Python',
        imagem: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=600&h=400&fit=crop',
        descricao: 'Linguagem de programação de alto nível interpretada, conhecida por sua sintaxe clara e legível. Amplamente usada em ciência de dados, IA e desenvolvimento web.'
    },
    'php': {
        titulo: 'PHP',
        imagem: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&h=400&fit=crop',
        descricao: 'Linguagem de script de uso geral voltada para o desenvolvimento web. Pode ser embutida no HTML e é especialmente adequada para criação de sites dinâmicos.'
    },
    'csharp': {
        titulo: 'C#',
        imagem: 'https://images.unsplash.com/photo-1611926653458-09294b3146df?w=600&h=400&fit=crop',
        descricao: 'Linguagem de programação moderna, orientada a objetos e de propósito geral desenvolvida pela Microsoft como parte da plataforma .NET.'
    },
    'cplusplus': {
        titulo: 'C++',
        imagem: 'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?w=600&h=400&fit=crop',
        descricao: 'Linguagem de programação compilada multi-paradigma e de uso geral. É uma extensão da linguagem C com recursos adicionais como orientação a objetos.'
    },
    'css': {
        titulo: 'CSS',
        imagem: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
        descricao: 'Linguagem de estilo usada para descrever a apresentação de documentos HTML. Controla o layout, cores, fontes e outros aspectos visuais das páginas web.'
    },
    'ruby': {
        titulo: 'Ruby',
        imagem: 'https://images.unsplash.com/photo-1606144048614-00001c3b5a69?w=600&h=400&fit=crop',
        descricao: 'Linguagem de programação interpretada multiparadigma, de tipagem dinâmica e forte, com gerenciamento de memória automático. Conhecida pelo framework Ruby on Rails.'
    },
    'c': {
        titulo: 'Linguagem C',
        imagem: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
        descricao: 'Linguagem de programação compilada de propósito geral, procedural e imperativa. É uma das linguagens mais influentes na história da computação.'
    },
    'swift': {
        titulo: 'Swift',
        imagem: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=600&h=400&fit=crop',
        descricao: 'Linguagem de programação desenvolvida pela Apple para desenvolvimento iOS, macOS, watchOS e tvOS. É moderna, segura e de alta performance.'
    }
};

// Função para navegação via Ajax
function navegarViaAjax(url, selector, push = true) {
    if (!url || !selector) {
        console.error('URL ou seletor não definido');
        return;
    }
    
    const elemento = document.querySelector(selector);
    if (!elemento) {
        console.error('Elemento não encontrado:', selector);
        return;
    }
    
    // Mostra loading
    elemento.classList.add('loading');
    
    fetch(url)
        .then(resp => {
            if (!resp.ok) {
                throw new Error(`Erro HTTP: ${resp.status}`);
            }
            return resp.text();
        })
        .then(html => {
            elemento.innerHTML = html;
            elemento.classList.remove('loading');
            
            // Inicializa os eventos após carregar o conteúdo
            inicializarEventos();
            
            if (push) {
                history.pushState({ selector: selector }, "", url);
            }
        })
        .catch(err => {
            console.error('Erro ao carregar página:', err);
            elemento.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #e53e3e;">
                    <h3 style="margin-bottom: 1rem;">😕 Erro ao carregar o conteúdo</h3>
                    <p style="margin-bottom: 1.5rem;">${err.message}</p>
                    <button onclick="location.reload()" style="padding: 12px 24px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1em;">
                        🔄 Recarregar Página
                    </button>
                </div>
            `;
            elemento.classList.remove('loading');
        });
}

// Função para mostrar detalhes
function mostrarDetalhes(item) {
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="btn-fechar">&times;</button>
                <img src="${item.imagem}" alt="${item.titulo}" class="detalhes-imagem">
                <h2 class="detalhes-titulo">${item.titulo}</h2>
                <p class="detalhes-descricao">${item.descricao}</p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Fechar modal
    const btnFechar = document.querySelector('.btn-fechar');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    btnFechar.addEventListener('click', function() {
        modalOverlay.remove();
    });
    
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', function fecharComESC(e) {
        if (e.key === 'Escape') {
            modalOverlay.remove();
            document.removeEventListener('keydown', fecharComESC);
        }
    });
}

// Inicializar eventos dos itens
function inicializarEventos() {
    // Eventos para séries
    document.querySelectorAll('.item-lista[data-tipo="serie"]').forEach(item => {
        item.addEventListener('click', function() {
            const serieId = this.getAttribute('data-id');
            const serie = seriesData[serieId];
            
            if (serie) {
                mostrarDetalhes(serie);
            }
        });
    });
    
    // Eventos para linguagens
    document.querySelectorAll('.item-lista[data-tipo="linguagem"]').forEach(item => {
        item.addEventListener('click', function() {
            const linguagemId = this.getAttribute('data-id');
            const linguagem = linguagensData[linguagemId];
            
            if (linguagem) {
                mostrarDetalhes(linguagem);
            }
        });
    });
}

// Configura os eventos de clique nos links de navegação
document.querySelectorAll('[wm-link]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove a classe active de todos os links
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        
        // Adiciona a classe active ao link clicado
        this.classList.add('active');
        
        const url = this.getAttribute('wm-link');
        const destino = this.getAttribute('wm-destino');
        navegarViaAjax(url, destino);
    });
});

// Configura o botão voltar/avançar
window.addEventListener('popstate', function(e) {
    if (e.state && e.state.selector) {
        navegarViaAjax(window.location.href, e.state.selector, false);
    }
});

// Inicializa a aplicação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 SPA App inicializada com sucesso!');
    
    // Inicializa eventos na página inicial
    inicializarEventos();
});