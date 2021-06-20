import { ActionButton, useCMS, usePlugin } from 'tinacms';

export default function DeleteAction({ form }) {
  const cms = useCMS();
  return (
    <ActionButton
      onClick={async () => {
        if (!confirm(`Are you sure you want to delete ?`)) {
          return;
        }

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
