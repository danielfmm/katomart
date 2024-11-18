const { ref, onMounted, watch } = Vue
import { alert } from "../stores.js"

export default {
  async setup() {
    const alreadyAgreed = ref(true)
    const message = ref(alert.message)

    watch(alert, (value) => {
      message.value = value.message
    })

    onMounted(async () => {
      const res = await fetch('/api/agreement')
      const data = await res.json()
      alreadyAgreed.value = data.consent
    })

    const buttonEnabled = ref(false)

    return { alreadyAgreed, message, buttonEnabled }
  },
  template: `
  <section class="py-10">
    <h1 class="text-2xl font-bold text-center mb-6">
      Termo de Aceitação e Responsabilidade do Usuário para o Uso do Software Katomart
    </h1>

    <div className="flex justify-center">
      <div v-if="message" class="alert alert-error shadow-lg mb-6 w-1/2">
        {{ message }}
      </div>
    </div>

    <div
      class="container max-w-4xl mx-auto bg-base-100 shadow-xl rounded-lg p-6 border-2 border-error"
    >
      <p>
        Ao utilizar o software Katomart ("Software"), disponível em
        <a
          href="https://github.com/katomaro/katomart"
          class="link link-accent hover:underline"
        >
          github.com/katomaro/katomart </a
        >, declaro estar plenamente ciente e concordar com os seguintes termos:
      </p>
      <ul class="list-disc pl-5 my-4 space-y-2">
        <li>
          <b>Conformidade com a Lei</b>: Comprometo-me a usar o Software em estrita
          conformidade com todas as leis, regulamentos e diretrizes aplicáveis vigentes no
          Brasil e em qualquer jurisdição aplicável ao uso do Software.
        </li>
        <li>
          <b>Relações Contratuais</b>: Estou ciente de que o uso do Software pode violar
          termos e condições estabelecidos em contratos com terceiros, incluindo, mas não se
          limitando a, plataformas-alvo de conteúdo digital. Reconheço que sou o único
          responsável por qualquer violação contratual decorrente do uso do Software.
        </li>
        <li>
          <b>Isenção de Responsabilidade</b>: Isento os desenvolvedores, contribuidores e
          qualquer pessoa associada ao desenvolvimento do Software de toda e qualquer
          responsabilidade relacionada ao uso que faço do mesmo. Entendo que o Software é de
          código aberto, podendo ser editado e modificado por qualquer pessoa, e que seu uso
          seguro depende exclusivamente da obtenção do Software através do link oficial
          mencionado acima.
        </li>
        <li>
          <b>Riscos de Compartilhamento Ilegal</b>: Reconheço que o compartilhamento não
          autorizado de material protegido por direitos autorais constitui um crime sob a
          legislação brasileira, sujeito a penalidades que incluem detenção e multas,
          especialmente quando tal compartilhamento visa lucro DIRETO ou INDIRETO,
          configurando agravante que aumenta as penas aplicáveis.
        </li>
        <li>
          <b>Combate à Pirataria</b>: Estou ciente de que, caso utilize o Software para fins
          de pirataria, uma equipe especializada poderá empregar técnicas proprietárias para
          rastrear a origem do material ilegalmente compartilhado. Em tal evento, os
          desenvolvedores do Software irão cooperar com as autoridades e investigadores.
          Além disso, os titulares dos direitos autorais serão notificados, e estarei
          sujeito a processos legais.
        </li>
        <li>
          <b>Consequências Legais</b>: Aceito todas as consequências legais que possam advir
          do uso inadequado do Software, incluindo, mas não se limitando a, ações civis e
          criminais.
        </li>
      </ul>
      <p>
        Ao utilizar o Software, confirmo minha total compreensão e concordância com os
        termos expressos neste acordo, comprometendo-me a respeitar todas as obrigações aqui
        descritas, em especial, quanto ao não compartilhamento do conteúdo obtido por meio
        do uso do Software, e quanto à minha responsabilidade de exclusão de material
        baixado proveniente de assinaturas temporárias quando estas expirarem.
      </p>
      <br/>
      <p>
        <strong class="text-red-500">IMPORTANTE:</strong> Este programa gera um arquivo chamado
        "main.sqlite3", que é um banco de dados local. Este arquivo é de uso exclusivo do
        Software e não deve ser compartilhado ou utilizado por outros programas. Ele contém
        todas as informações que você usar no Software, incluindo o seu consentimento.
        Caso ele seja deletado durante a execução do programa, o Software irá apagar TODO 
        o conteúdo do caminho de download configurado. Não tente alterar este arquivo manualmente
        nem o compartilhe com terceiros.
      </p>
      <hr class="my-6" />
      <form action="/api/agreement" method="post" class="text-center">
        <div class="form-control">
          <label class="label cursor-pointer justify-center">
            <span class="mr-3">Li e concordo com os termos acima</span>
            <input
              type="checkbox"
              name="agreement"
              class="checkbox checkbox-primary"
              :checked="alreadyAgreed"
              :disabled="alreadyAgreed"
              @change="(e) => buttonEnabled = e.target.checked"
            />
          </label>
        </div>
        <button class="btn btn-primary mt-4" v-if="!alreadyAgreed" :disabled="!buttonEnabled">
          <i class="fa-solid fa-check"></i>
          <span>Aceitar</span>
        </button>
      </form>
    </div>
  </section>
  `
}