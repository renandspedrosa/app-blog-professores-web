import { Link } from 'react-router-dom';
import { Form, Input, Button, FormError } from '@/components/Form';
import Load from '@/components/Load';
import { useFormik } from 'formik';
import useCreatePostForm from '@/hooks/useCreatePostForm';
import schema from '@/pages/CreatePost/schema';

const CreatePost = () => {
    const { loading, formPost, handleCreatePost } = useCreatePostForm();

    const formik = useFormik({
        initialValues: {
            title: formPost.title || '',
            content: formPost.content || '',
            attachment: null,
        },
        validationSchema: schema,
        onSubmit: (values) => {
            handleCreatePost(values);
        },
    });

    if (loading) {
        return <Load />;
    }

    return (
        <Form onSubmit={formik.handleSubmit}>
            <div className="border-b border-gray-900/7 pb-12">
                {/* Campo Título */}
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <Input
                            label="Título"
                            type="text"
                            required
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.title && formik.errors.title}
                        />

                        <FormError error={formik.touched.title && formik.errors.title} />
                    </div>
                </div>

                {/* Campo Conteúdo */}
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                        <Input
                            label="Conteúdo"
                            type="textarea"
                            required
                            name="content"
                            value={formik.values.content}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.content && formik.errors.content}
                        />

                        <FormError error={formik.touched.content && formik.errors.content} />
                    </div>
                </div>

                {/* Campo Anexo */}
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                        <Input
                            label="Anexo"
                            type="file"
                            name="attachment"
                            onChange={(e) => formik.setFieldValue('attachment', e.target.files[0])}
                            onBlur={formik.handleBlur}
                        />

                        <FormError error={formik.touched.attachment && formik.errors.attachment} />
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to="/" className="text-sm font-semibold text-gray-900">Cancelar</Link>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                </Button>
            </div>
        </Form>
    );
};

export default CreatePost;
