<script lang="ts" generics="DataType">
    interface Props{
        choice: DataType;
        choiceList: DataType[];
        saveChanges: ()=> void;
    }

    let {
        choice,
        choiceList,
        saveChanges
    }: Props =$props();
</script>

<div>
    Placement {choice.name}
</div>