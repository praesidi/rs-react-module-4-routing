import styles from './location.module.css';
import type { Character as CharacterData } from "../../shared/api/types";
// import { formatDate } from "../../shared/utils/date";
import { ContentWrapper } from "../../shared/components/content-wrapper/content-wrapper";
import { Image } from '../../shared/components/image/image'
import { useParams } from 'react-router';
import { api } from '../../shared/api/api';
import { useFetch } from '../../shared/hooks/useFetchCatalog';

export const Character: React.FC = () => {
    const { id } = useParams();
	const url = id ? api.episodes.detailed(id) : null;

	const { data, loading, error } = useFetch<CharacterData>(url);

	return (
        <ContentWrapper
            data={data}
            loading={loading}
            error={error}
        >   
            <h1 className={styles.title}>Characters</h1>
            <div className={styles.description}>
            	<h3 className={styles.item_name}>{data ? data.name : ''}</h3>
                {/* <p> : {value ? String(value) : '-'} </p> */}
            </div>
            <Image
                src={null}
                alt="location image"
            />
        </ContentWrapper>
	);
};
