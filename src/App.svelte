<script lang="res">
    let a = 4444;
    let b = Test.Testing.b;

    let run = (n) => {
        Js.Console.log(a + n)
    }
</script>

<h1>{a + b}</h1>

<button on:click={_ => run(2)}>
</button>
