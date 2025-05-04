import onChangeVKPart from 'src/listeners/onChangeVKPart';

onChangeVKPart((pe) => {
	delete pe.global_variable_wrapper;
});
