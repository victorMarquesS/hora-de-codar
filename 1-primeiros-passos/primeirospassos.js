// 1.1
// let nome_do_carro = "Fusca";
// alert(nome_do_carro);

// 1.2
// let nome = prompt("Insira seu nome: ");
// alert("Olá, " + nome);

// 1.3
// let nome = prompt("Insira seu nome: ");
// let idade = prompt("Quantos anos você tem?");
// alert(`Olá ${nome.toUpperCase()}, sua idade é ${idade}. Seu nome tem ${nome.length} letras.`);
// alert("Mantenha o foco e continue praticando!");


// Condicionais

// 2.1
// let numero1 = Number(prompt("Escolha um número para comparar: "));
// let numero2 = Number(prompt("Escolha o segundo número para comparar: "));
// if (numero1 > numero2){
//     alert(`O número maior é: ${numero1}`);
// } else if (numero2 > numero1){
//     alert(`O número maior é: ${numero2}`);
// } else {
//     alert("Os números são iguais.");
// }

// 2.2
// let numbercompar = Number(prompt("Escolha o número que deseja saber se é negativo, positivo ou neutro: "));
// if (numbercompar > 0){
//     alert("O número é positivo");
// } else if (numbercompar < 0){
//     alert("O número é negativo");
// } else {
//     alert("O número é zero");
// }

// 2.3
// let n1 = Number(prompt("Digite o 1º número: "));
// let n2 = Number(prompt("Digite o 2º número: "));
// let n3 = Number(prompt("Digite o 3º número: "));
// let maior = n1;
// if (n2 > maior) { maior = n2; }
// if (n3 > maior) { maior = n3; }
// alert(`O maior número é: ${maior}`);

// 2.4
// let n1 = Number(prompt("Digite o 1º número: "));
// let n2 = Number(prompt("Digite o 2º número: "));
// let n3 = Number(prompt("Digite o 3º número: "));
// let maior, segundoMaior; // Correção: variável segundoMaior declarada
// if (n1 > n2 && n1 > n3) {
//     maior = n1;
// } else if (n2 > n1 && n2 > n3){
//     maior = n2;
// } else {
//     maior = n3;
// }
// if (maior === n1) {
//     segundoMaior = Math.max(n2, n3);
// } else if (maior === n2) {
//     segundoMaior = Math.max(n1, n3);
// } else {
//     segundoMaior = Math.max(n1, n2);
// }
// alert(`A soma dos dois maiores é: ${maior + segundoMaior}`);

// 2.5
// let n1 = Number(prompt("Digite o 1º número: "));
// let n2 = Number(prompt("Digite o 2º número: "));
// let n3 = Number(prompt("Digite o 3º número: "));
// let n4 = Number(prompt("Digite o 4º número: "));
// let n5 = Number(prompt("Digite o 5º número: "));
// let n6 = Number(prompt("Digite o 6º número: "));
// alert(`Os valores digitados foram: ${n1}, ${n2}, ${n3}, ${n4}, ${n5}, ${n6}`);
// let soma = n1 + n2 + n3 + n4 + n5 + n6;
// let media = soma / 6;
// alert(`A soma dos números digitados é: ${soma} e a média é: ${media}`);

// 2.6
// let n1 = Number(prompt("Digite o 1º número: "));
// let n2 = Number(prompt("Digite o 2º número: "));
// let n3 = Number(prompt("Digite o 3º número: "));
// let n4 = Number(prompt("Digite o 4º número: "));
// let primeiro = n1;
// let ultimo = n4;
// let maior = n1;
// if (n2 > maior) maior = n2;
// if (n3 > maior) maior = n3;
// if (n4 > maior) maior = n4;
// alert(`O maior número é: ${maior}`);
// alert(`O primeiro número digitado foi: ${primeiro} e o último número digitado foi: ${ultimo}`);

// 2.7
// let valores = [];
// let soma = 0;
// for (let i = 0; i < 6; i++) {
//     let numero = Number(prompt(`Digite o ${i + 1}º número: `));
//     valores.push(numero);
//     if (numero < 72) {
//         soma += numero;
//     }
// }
// alert(`Os valores foram: ${valores.join(", ")}`);
// alert(`A soma dos números menores que 72 é: ${soma}`);

// 2.8
// let n1, n2, n3, n4;
// n1 = Number(prompt("Digite o 1º número (maior que 0 e menor que 10): "));
// while (n1 <= 0 || n1 >= 10) {
//     alert("Valor inválido! Digite um número maior que 0 e menor que 10.");
//     n1 = Number(prompt("Digite o 1º número novamente: "));
// }
// n2 = Number(prompt("Digite o 2º número (maior que 0 e menor que 10): "));
// while (n2 <= 0 || n2 >= 10) {
//     alert("Valor inválido! Digite um número maior que 0 e menor que 10.");
//     n2 = Number(prompt("Digite o 2º número novamente: "));
// }
// n3 = Number(prompt("Digite o 3º número (maior que 0 e menor que 10): "));
// while (n3 <= 0 || n3 >= 10) {
//     alert("Valor inválido! Digite um número maior que 0 e menor que 10.");
//     n3 = Number(prompt("Digite o 3º número novamente: "));
// }
// n4 = Number(prompt("Digite o 4º número (maior que 0 e menor que 10): "));
// while (n4 <= 0 || n4 >= 10) {
//     alert("Valor inválido! Digite um número maior que 0 e menor que 10.");
//     n4 = Number(prompt("Digite o 4º número novamente: "));
// }
// let soma = n1 + n2 + n3 + n4;
// let media = soma / 4;
// if (media > 5) { alert("Você passou no teste"); }
// else { alert("Tente novamente"); }

// 2.9
// let anoNascimento = Number(prompt(`Digite o ano do seu nascimento: `));
// let anoAtual = new Date().getFullYear();
// let idade = anoAtual - anoNascimento;
// if (idade >= 16){
//     alert(`Você tem ${idade} anos, você pode votar!`);
// } else { 
//     alert(`Você tem ${idade} anos, você não pode votar!`);
// }


// Laços de repetição

// 3.1
// for (let i = 30; i >= 0; i--) {
//     console.log(i);
// }
// alert("EXPLOSÃO"); // Correção: Texto alterado

// 3.2
// let primeiroValor = Number(prompt("Digite o primeiro valor: "));
// let segundoValor = Number(prompt("Digite o segundo valor: "));
// while (segundoValor <= 0) {
//     alert("O segundo valor deve ser maior que zero. Por favor, digite novamente.");
//     segundoValor = Number(prompt("Digite o segundo valor: "));
// }
// let resultado = primeiroValor / segundoValor;
// alert(`O resultado da divisão de ${primeiroValor} por ${segundoValor} é: ${resultado}`);

// 3.3
// let soma = 0;
// let quantidade = 0;
// for (let i = 15; i <= 100; i++) {
//     soma += i;
//     quantidade++;
// }
// let media = soma / quantidade;
// alert(`A soma dos números de 15 a 100 é: ${soma} e a média é: ${media}`);

// 3.4
// let primeiro, segundo;
// do {
//     primeiro = Number(prompt("Digite o primeiro número inteiro (menor): "));
//     if (Number.isNaN(primeiro)) {
//         alert("Valor inválido! Digite um número.");
//     }
// } while (Number.isNaN(primeiro));
// do {
//     segundo = Number(prompt("Digite o segundo número inteiro (maior): "));
//     if (Number.isNaN(segundo)) {
//         alert("Valor inválido! Digite um número.");
//     } else if (segundo <= primeiro) {
//         alert(`O segundo número precisa ser maior que ${primeiro}. Tente novamente.`);
//     }
// } while (Number.isNaN(segundo) || segundo <= primeiro);
// let soma = 0;
// let quantidade = 0;
// for (let i = primeiro; i <= segundo; i++) {
//     soma += i;
//     quantidade++;
// }
// let media = soma / quantidade;
// alert(`A média dos números entre ${primeiro} e ${segundo} é: ${media}`);

// 3.5
// let aprovados = 0;
// let resposta;
// do {
//     let nota1 = Number(prompt("Digite a 1ª nota do aluno: "));
//     let nota2 = Number(prompt("Digite a 2ª nota do aluno: "));
//     let media = (nota1 + nota2) / 2;
//     alert(`A média do aluno foi: ${media.toFixed(2)}`);
//     if (media >= 9.5) {
//         alert("Aluno APROVADO!");
//         aprovados++; 
//     } else {
//         alert("Aluno reprovado.");
//     }
//     resposta = prompt("Calcular a média de outro aluno? (S/N)").toUpperCase();
// } while (resposta === "S");
// alert(`Total de alunos aprovados: ${aprovados}`);

// 3.6
// let soma = 0;
// for (let i = 0; i < 6; i++) {
//     let nota;
//     do {
//         nota = Number(prompt(`Digite a ${i + 1}ª nota (de 0 a 10):`));
//         if (Number.isNaN(nota) || nota < 0 || nota > 10) {
//             alert("Valor inválido! Digite uma nota entre 0 e 10.");
//         }
//     } while (Number.isNaN(nota) || nota < 0 || nota > 10);
//     soma += nota;
// }
// let media = soma / 6;
// alert(`A média das notas é: ${media.toFixed(2)}`);

// 3.7
// let N;
// do {
//     N = Number(prompt("Digite um número inteiro positivo: "));
//     if (Number.isNaN(N)) {
//         alert("Valor inválido! Digite um número");
//     } else if (N <= 0) {
//         alert("O número precisa ser positivo. Tente novamente");
//     }
// } while (Number.isNaN(N) || N <= 0); // Correção: parênteses fechados no lugar certo
// for (let i = 1; i <= N; i++) {
//     console.log(i);
// }
// alert(`Os números de 1 até ${N} foram exibidos no console`);

// 3.8
// let numero = 101;
// let contador = 0;
// while (contador < 10) {
//     console.log(numero);
//     numero++;   
//     contador++;
// }

// 3.9
// let dentro = 0;
// let fora = 0;
// for (let i = 0; i < 10; i++) {
//     let valor = Number(prompt(`Digite o ${i + 1}º valor: `));
//     if (valor >= 24 && valor <= 42) {
//         dentro++; 
//     } else {
//         fora++;
//     }
// }
// alert(`Valores dentro do intervalo: ${dentro}`); // Correção: Adicionados os alerts finais
// alert(`Valores fora do intervalo: ${fora}`);