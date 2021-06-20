import { ActionButton, useCMS, usePlugin } from 'tinacms';

export default function DeleteAction({ form }) {
  const cms = useCMS();
  return (
    <ActionButton
      onClick={async () => {
        if (!confirm(`Are you sure you want to delete ?`)) {
          return;
        }

        console.log(cms.api.github.onDelete, form);
        // await cms.api.github.onDelete({
        //   relPath: form.values.fileRelativePath,
        // });

        // window.history.back();
      }}
    >
      Delete
    </ActionButton>
  );
}
