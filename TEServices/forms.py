# -*- coding: utf-8 -*-
from django import forms
from django.db import models


class DocumentForm(forms.Form):

    docfile = forms.FileField(label='', show_hidden_initial='none',required=True,)
    compare_build = forms.FileField(label='', show_hidden_initial='none',required=True,)
    test_data = forms.FileField(label='', show_hidden_initial='none',required=True,)


class e2eForm(forms.Form):
    e2e_file = forms.FileField(label='', show_hidden_initial='none',required=True,)
